import { StoryData } from '../types';

export const generatePDF = async (storyData: StoryData): Promise<void> => {
  try {
    // Import jsPDF dynamically
    const { jsPDF } = await import('jspdf');
    
    // Create new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set up fonts and styling
    pdf.setFont('helvetica');
    
    // Add title
    pdf.setFontSize(24);
    pdf.setTextColor(30, 58, 138); // Blue color
    const titleLines = pdf.splitTextToSize(storyData.title, 170);
    pdf.text(titleLines, 20, 30);
    
    // Add subtitle
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Généré par Hero AI', 20, 45);
    
    // Add story details
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    pdf.text(`Héros: ${storyData.heroName} | Mot magique: ${storyData.secretWord}`, 20, 55);
    
    // Add image if available
    if (storyData.imageUrl && !storyData.imageUrl.includes('unsplash')) {
      try {
        // For generated images, we'll add a placeholder
        pdf.setFillColor(240, 240, 240);
        pdf.rect(20, 65, 80, 60, 'F');
        pdf.setFontSize(8);
        pdf.setTextColor(120, 120, 120);
        pdf.text('Illustration générée', 45, 95);
      } catch (imageError) {
        console.log('Could not add image to PDF');
      }
    }
    
    // Add story content
    pdf.setFontSize(11);
    pdf.setTextColor(40, 40, 40);
    
    const startY = storyData.imageUrl && !storyData.imageUrl.includes('unsplash') ? 140 : 70;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 6;
    let currentY = startY;
    
    // Split content into paragraphs
    const paragraphs = storyData.content.split('\n\n').filter(p => p.trim());
    
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        // Check if we need a new page
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = 30;
        }
        
        // Add paragraph spacing
        if (index > 0) {
          currentY += 4;
        }
        
        // Split paragraph into lines that fit the page width
        const lines = pdf.splitTextToSize(paragraph.trim(), 170);
        
        lines.forEach((line: string) => {
          if (currentY > pageHeight - 30) {
            pdf.addPage();
            currentY = 30;
          }
          
          pdf.text(line, margin, currentY);
          currentY += lineHeight;
        });
      }
    });
    
    // Add footer
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Page ${i} sur ${totalPages}`, 170, pageHeight - 10);
      pdf.text('Hero AI - Générateur d\'histoires', 20, pageHeight - 10);
    }
    
    // Save the PDF
    const fileName = `${storyData.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error('Error generating PDF with jsPDF:', error);
    
    // Fallback to HTML method
    try {
      const htmlContent = createPDFHTML(storyData);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const printWindow = window.open(url, '_blank', 'width=800,height=600');
      
      if (!printWindow) {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${storyData.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          setTimeout(() => {
            printWindow.close();
            URL.revokeObjectURL(url);
          }, 1000);
        }, 500);
      };

    } catch (fallbackError) {
      console.error('Fallback PDF generation failed:', fallbackError);
      
      // Ultimate fallback: copy to clipboard
      try {
        const textContent = `${storyData.title}\n\n${storyData.content}\n\n---\nGénéré par Hero AI\nHéros: ${storyData.heroName} | Mot magique: ${storyData.secretWord}`;
        await navigator.clipboard.writeText(textContent);
        alert('Le contenu de l\'histoire a été copié dans le presse-papiers !');
      } catch (clipboardError) {
        alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
      }
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', Arial, sans-serif;
          line-height: 1.7;
          color: #1e293b;
          background: white;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #3b82f6;
        }
        
        .title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        
        .subtitle {
          font-size: 1rem;
          color: #64748b;
          font-weight: 400;
        }
        
        .story-details {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #f97316;
          font-size: 0.9rem;
          color: #475569;
        }
        
        .story-content {
          font-size: 1.1rem;
          line-height: 1.8;
          text-align: justify;
          color: #374151;
          margin: 30px 0;
        }
        
        .story-content p {
          margin-bottom: 1.2em;
        }
        
        .story-content p:first-of-type::first-letter {
          font-size: 3.5em;
          font-weight: 700;
          float: left;
          line-height: 0.8;
          margin: 0.1em 0.1em 0 0;
          color: #1e40af;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 0.9rem;
        }
        
        @media print {
          body {
            padding: 20px;
          }
          
          .header {
            margin-bottom: 30px;
          }
        }
        
        @page {
          margin: 2cm;
          size: A4;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">${storyData.title}</h1>
        <p class="subtitle">Une aventure générée par Hero AI</p>
      </div>
      
      <div class="story-details">
        <strong>Héros:</strong> ${storyData.heroName} | 
        <strong>Mot magique:</strong> ${storyData.secretWord} | 
        <strong>Taille:</strong> ${storyData.size}
      </div>
      
      <div class="story-content">
        ${storyData.content.split('\n\n').map(paragraph => 
          paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
        ).join('')}
      </div>
      
      <div class="footer">
        <p>✨ Généré avec Hero AI ✨</p>
      </div>
    </body>
    </html>
  `;
};