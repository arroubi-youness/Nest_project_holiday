import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import { IntegerType } from 'typeorm';



export async function generatePDF(demande: any, userName: string,familyName:string,type:IntegerType): Promise<any> {
try{
  const pdfPath = `./src/demande_${demande._id}.pdf`;
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  if(type===1){
    

 
   doc.fontSize(20).text('Demande de Congé Annual Acceptée', { align: 'center' });
   doc.moveDown();
   doc.fontSize(12).text(
    `Nous avons le plaisir de vous informer que votre demande de congé a été acceptée. ` +
    `Votre congé est maintenant validé, et les détails sont les suivants :\n\n` +
    `Identifiant de la demande : ${demande._id}\n` +
    `Utilisateur :${familyName} ${userName} \n` +
    `Statut : ${demande.demande_Status}\n` +
    `Date de début du congé : ${new Date(demande.Start_date).toLocaleDateString()}\n` +
    `Date de fin du congé : ${new Date(demande.End_date).toLocaleDateString()}\n` +
    `Jours restants : ${demande.Remainain_day} jour(s).\n\n` +
    `De plus, voici les dates importantes liées à votre congé :\n` +
    `Votre congé commence le ${new Date(demande.Start_date).toLocaleDateString()} et se termine le ${new Date(demande.End_date).toLocaleDateString()}.\n` +
    `Nous vous souhaitons une excellente période de congé et restons disponibles pour toute information complémentaire.\n\n` +
    `Nous vous prions de bien vouloir respecter les dates indiquées pour le bon déroulement de votre congé .\n\n`
   ); 
    doc.fontSize(12).text(
    `Cordialement,\n` +
    `L'équipe des ressources humaines`,{ align: 'right' }
   );
  
  doc.end();
  }
  else if(type===0){
    doc.fontSize(20).text('Refus de Demande de Congé pour Jours Insuffisants', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(
     `Nous vous informons que votre demande de congé n'a pas pu être acceptée, en raison d'un nombre de jours de congé insuffisants. ` +
     `Voici les détails de votre demande :\n\n` +
     `Identifiant de la demande : ${demande._id}\n` +
     `Utilisateur : ${familyName} ${userName}\n` +
     `Statut : ${demande.demande_Status}\n` +
     `Jours restants : ${demande.Remainain_day}\n\n`
    );

    doc.fontSize(12).text(
     `Nous vous rappelons qu'il est toujours possible de soumettre une nouvelle demande de congé en utilisant les jours restants disponibles. ` +
     `Pour ce faire, veuillez vous assurer que la durée demandée respecte le solde de congés disponible.\n\n` +
     `Pour toute question ou assistance supplémentaire, nous vous invitons à contacter le service des ressources humaines.\n\n`
    );
    doc.fontSize(12).text(
     `Cordialement,\n` +
     `L'équipe des Ressources Humaines`, { align: 'right' }
    );
    doc.end();

  }else if(type===2){
    doc.fontSize(20).text('Demande de Congé maladie Acceptée', { align: 'center' });
   doc.moveDown();
   doc.fontSize(12).text(
    `Nous avons le plaisir de vous informer que votre demande de congé a été acceptée. ` +
    `Votre congé est maintenant validé, et les détails sont les suivants :\n\n` +
    `Identifiant de la demande : ${demande._id}\n` +
    `Utilisateur :${familyName} ${userName} \n` +
    `Statut : ${demande.demande_Status}\n` +
    `Date de début du congé : ${new Date(demande.Start_date).toLocaleDateString()}\n` +
    `Date de fin du congé : ${new Date(demande.End_date).toLocaleDateString()}\n` +
    `De plus, voici les dates importantes liées à votre congé :\n` +
    `Votre congé commence le ${new Date(demande.Start_date).toLocaleDateString()} et se termine le ${new Date(demande.End_date).toLocaleDateString()}.\n` +
    `Nous vous souhaitons une excellente période de congé et restons disponibles pour toute information complémentaire.\n\n` +
    `Nous vous prions de bien vouloir respecter les dates indiquées pour le bon déroulement de votre congé .\n\n`
   ); 
    doc.fontSize(12).text(
    `Cordialement,\n` +
    `L'équipe des ressources humaines`,{ align: 'right' }
   );
  
  doc.end();
  }else if(type===3){
    doc.fontSize(20).text('Demande de Congé Annual Refusée', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(
      `Nous regrettons de vous informer que votre demande de congé a été refusée. ` +
      `Les détails de votre demande sont les suivants :\n\n` +
      `Identifiant de la demande : ${demande._id}\n` +
      `Utilisateur : ${familyName} ${userName}\n` +
      `Statut : ${demande.demande_Status}\n` +
      `Pour plus d'informations sur les raisons du refus, veuillez contacter le service des ressources humaines.\n\n` +
      `Nous restons disponibles pour toute clarification supplémentaire.\n\n`
    );
    doc.fontSize(12).text(
      `Cordialement,\n` +
      `L'équipe des ressources humaines`, { align: 'right' }
    );
    doc.end();
  }else if(type===4){
    doc.fontSize(20).text('Demande de Congé en Attente de Traitement', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(
      `Votre demande de congé est actuellement en cours de traitement. ` +
      `Les détails de votre demande sont les suivants :\n\n` +
      `Identifiant de la demande : ${demande._id}\n` +
      `Utilisateur : ${familyName} ${userName}\n` +
      `Statut : ${demande.demande_Status}\n\n` +
      `En raison de la vacance de votre poste pendant cette période, une réunion sera organisée pour ` +
      `décider des mesures à prendre et déterminer quel employé pourra prendre congé. \n\n` +
      `La réunion est planifiée comme suit :\n` +
      `Date : ${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}\n` +
      `Heure : 15:00\n\n` +
      `Lien pour rejoindre la réunion : check your Email\n\n` +
      `Votre participation est essentielle pour clarifier votre demande et trouver une solution adaptée. ` +
      `Nous vous remercions pour votre compréhension et votre collaboration.\n\n`
);
doc.fontSize(12).text(
  `Cordialement,\n` +
  `L'équipe des ressources humaines`, { align: 'right' }
);
doc.end();

  }


  return await pdfPath;

}
catch(error:unknown){
  if(error instanceof Error){
    console.log(error.message);
  }
}}



export async function sendEmailWithPDF(to: string, pdfPath: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7571314aec0534",
      pass: "d1068864335996"
  }
  });

  const mailOptions = {
    from: '63f2ba76c4-ac12fe@inbox.mailtrap.io',
    to: to,
    subject: 'Confirmation de Demande de Congé',
    text: 'Votre demande de congé a été acceptée. Veuillez trouver les détails en pièce jointe.',
    attachments: [
      {
        filename: `Demande_de_congé.pdf`,
        path: pdfPath, 
      },
    ],
  };


  await transporter.sendMail(mailOptions);
}

