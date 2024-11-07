import { PDFDocument, rgb } from 'pdf-lib';
  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const logo = 'https://cdn.dribbble.com/userupload/2614322/file/original-6e1d4c449d23482f1b43163c29ca96be.png?resize=752x'
    const imgBytes = await fetch(logo).then(res=>res.arrayBuffer())
    const imglogo = await pdfDoc.embedPng(imgBytes)
    const { width, height } = imglogo.size();
    page.drawImage(imglogo,{
        x: 590,
        y: 790,
        width,
        height,

    })
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
                color: rgb(0.5, 0.9, 0.75),
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

export default createPdf

