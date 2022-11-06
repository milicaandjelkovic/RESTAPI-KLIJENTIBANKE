const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id_klijenta: {
        required: true,
        type: Number
    },

    ime: {
        reqired: true,
        type: String
    },

    prezime: {
        required: true,
        type: String
    },

    JMBG: {
        required: true,
        type: Number,
        length: 13
    },

    adresa: {
        required: true,
        type: String
    },

    broj_telefona: {
        required: true,
        type: String
    },

    e_mail: {
        required: true,
        type: String
    },

    broj_racuna: {
        required: true,
        type: Number
    },

    zaposlen: {
        required: true,
        type: String
    },

    mobilna_app: {
        required: false,
        type: String
    }, 

    sms_usluga: {
        required: false,
        type: String
    }, 

    kategorija: {
        required: true,
        type: String
    },

    paket_racun: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)