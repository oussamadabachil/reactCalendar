const mongoose = require('mongoose');

const dogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'userss', required: true },
    nom: { type: String, required: true },
    surnom: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    race: { type: String, required: true },
    sexe: { type: String, required: true },
    sterilise: { type: Boolean, required: true },
    vaccin: { type: Boolean, required: true },
    problemeDeSante: { type: String, required: true },
    caractere: { type: String, required: true },
    ententeAvecLesAutresChiens: { type: String, required: true },
    ententeAvecLesAutresChats : { type: String, required: true },
    ententeAvecLesEnfants: { type: String, required: true },
    habitudes: { type: String, required: true },
    peurs: { type: String, required: true },
});



const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings', required: true },
    alertes: { type: mongoose.Schema.Types.ObjectId, ref: 'alerts', required: true },
    telephone: { type: Number, required: true },
    rue: { type: String, required: true },
    ville: { type: String, required: true },
    codePostal: { type: Number, required: true },
    profession: { type: String, required: true },
    nomDeLaPersonneAContacter: { type: String, required: true },
    telephoneDeLaPersonneAContacter: { type: Number, required: true },
    chien: { type: mongoose.Schema.Types.ObjectId, ref: 'dogss', required: true },
});

module.exports = mongoose.model('userss', userSchema);
module.exports = mongoose.model('dogss', dogSchema);
