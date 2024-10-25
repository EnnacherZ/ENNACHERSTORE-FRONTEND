import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const PdfGenerator: React.FC = () => {
  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Définir les données du tableau
    const data = [
        ['Nom', 'Âge', 'Ville'],
        ['Alice', '30', 'Paris'],
        ['Bob', '25', 'Londres'],
        ['Charlie', '35', 'Berlin'],
    ];

    const startX = 50;
    const startY = 350;
    const cellWidth = 150;
    const cellHeight = 30;

    // Dessiner le tableau
    data.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const x = startX + colIndex * cellWidth;
            const y = startY - rowIndex * cellHeight;

            // Dessiner la cellule
            page.drawRectangle({
                x,
                y,
                width: cellWidth,
                height: cellHeight,
                color: rgb(0.9, 0.9, 0.9),
            });

            // Dessiner le texte de la cellule
            page.drawText(cell, {
                x: x + 10,
                y: y + 5,
                size: 12,
                color: rgb(0, 0, 0),
            });
        });
    });

    // Enregistrer le document PDF
    const pdfBytes = await pdfDoc.save();
    
    // Créer un blob pour le téléchargement
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tableau.pdf';
    link.click();
    URL.revokeObjectURL(url);
};

return (
    <div>
        <h1>Créer un PDF avec un Tableau</h1>
        <button onClick={createPdf}>Créer et Télécharger le PDF</button>
    </div>
);
};
export default PdfGenerator;
