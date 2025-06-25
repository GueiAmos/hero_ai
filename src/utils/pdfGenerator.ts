import { StoryData } from '../types';

export const generatePDF = async (storyData: StoryData): Promise<void> => {
  try {
    // Create a blob with the HTML content
    const htmlContent = createPDFHTML(storyData);
    
    // Create a temporary link element
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window for printing
    const printWindow = window.open(url, '_blank', 'width=800,height=600');
    
    if (!printWindow) {
      // Fallback: download as HTML file if popup is blocked
      const link = document.createElement('a');
      link.href = url;
      link.download = `${storyData.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    // Wait for the window to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close window after printing (user can cancel)
        setTimeout(() => {
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 1000);
      }, 500);
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Ultimate fallback: copy text to clipboard
    try {
      const textContent = `${storyData.title}\n\n${storyData.content}\n\n---\nGénéré par Hero AI\nHéros: ${storyData.heroName} | Mot magique: ${storyData.secretWord}`;
      await navigator.clipboard.writeText(textContent);
      alert('Le contenu de l\'histoire a été copié dans le presse-papiers !');
    } catch (clipboardError) {
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    }
  }
};

const createPDFHTML = (storyData: StoryData): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${storyData.title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Crimson Text', Georgia, serif;
          line-height: 1.8;
          color: #2c3e50;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          min-height: 100vh;
        }
        
        .header {
          text-align: center;
          margin-bottom: 50px;
          padding-bottom: 30px;
          border-bottom: 3px solid #8B5CF6;
          position: relative;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #8B5CF6, #3B82F6);
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 600;
          background: linear-gradient(135deg, #8B5CF6, #3B82F6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          line-height: 1.2;
        }
        
        .subtitle {
          font-size: 1.2rem;
          color: #64748b;
          font-style: italic;
          font-weight: 400;
        }
        
        .image-container {
          text-align: center;
          margin: 40px 0;
        }
        
        .story-image {
          max-width: 100%;
          width: 600px;
          height: 400px;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.15);
          border: 4px solid #f8fafc;
        }
        
        .story-content {
          font-size: 1.1rem;
          line-height: 2;
          text-align: justify;
          text-indent: 2em;
          color: #374151;
          margin: 40px 0;
        }
        
        .story-content p {
          margin-bottom: 1.5em;
        }
        
        .story-content::first-letter {
          font-size: 4em;
          font-weight: 600;
          float: left;
          line-height: 0.8;
          margin: 0.1em 0.1em 0 0;
          color: #8B5CF6;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 0.95rem;
        }
        
        .footer-title {
          font-size: 1.1rem;
          color: #8B5CF6;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .story-details {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          padding: 20px;
          border-radius: 15px;
          margin-top: 20px;
          border-left: 5px solid #8B5CF6;
        }
        
        .detail-item {
          margin: 8px 0;
          font-weight: 500;
        }
        
        .detail-label {
          color: #8B5CF6;
          font-weight: 600;
        }
        
        @media print {
          body {
            background: white;
          }
          
          .container {
            box-shadow: none;
            padding: 20px;
          }
          
          .story-image {
            max-height: 300px;
          }
        }
        
        @page {
          margin: 2cm;
          size: A4;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">${storyData.title}</h1>
          <p class="subtitle">Une aventure générée par Hero AI</p>
        </div>
        
        <div class="image-container">
          <img src="${storyData.imageUrl}" alt="Illustration de l'histoire" class="story-image" 
               onerror="this.style.display='none'" />
        </div>
        
        <div class="story-content">
          ${storyData.content.split('\n\n').map(paragraph => 
            paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
          ).join('')}
        </div>
        
        <div class="footer">
          <div class="footer-title">✨ Généré avec ❤️ par Hero AI ✨</div>
          <div class="story-details">
            <div class="detail-item">
              <span class="detail-label">Héros :</span> ${storyData.heroName}
            </div>
            <div class="detail-item">
              <span class="detail-label">Mot magique :</span> ${storyData.secretWord}
            </div>
            <div class="detail-item">
              <span class="detail-label">Taille :</span> ${storyData.size}
            </div>
            <div class="detail-item">
              <span class="detail-label">Langue :</span> ${storyData.language === 'fr' ? 'Français' : 'English'}
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};