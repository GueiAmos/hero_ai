import { StoryData } from '../types';

export const generatePDF = async (storyData: StoryData): Promise<void> => {
  // Create a new window with the story content formatted for printing
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Popup blocked. Please allow popups to download PDF.');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${storyData.title}</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #8B5CF6;
          padding-bottom: 20px;
        }
        .title {
          font-size: 32px;
          color: #8B5CF6;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .subtitle {
          font-size: 18px;
          color: #666;
          font-style: italic;
        }
        .image {
          width: 100%;
          max-width: 600px;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          margin: 30px auto;
          display: block;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .story-content {
          font-size: 16px;
          line-height: 1.8;
          text-align: justify;
          white-space: pre-line;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 14px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        @media print {
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">${storyData.title}</h1>
        <p class="subtitle">Une aventure générée par Hero AI</p>
      </div>
      
      <img src="${storyData.imageUrl}" alt="Illustration de l'histoire" class="image" />
      
      <div class="story-content">${storyData.content}</div>
      
      <div class="footer">
        <p>Généré avec ❤️ par Hero AI</p>
        <p>Héros: ${storyData.heroName} | Mot magique: ${storyData.secretWord}</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  
  // Wait for image to load before printing
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };
};