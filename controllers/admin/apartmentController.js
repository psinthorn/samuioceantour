
const Apartment = require('../../models/Apartment');
const ApartmentIntro =require('../../models/ApartmentIntro');
const mongoose = require('mongoose');
const Facility = require('../../models/Facility');
//const Apartment = mongoose.model('apartment');

module.exports = {


    //Get all available list of apartments
    getAll(req, res){

        Apartment.find({}).sort({ date: -1})
        .populate('user')
        .then(apartments => {
            res.render('admin/apartments-list', { apartments: apartments });
        });

    },


    //Create form 

    addForm(req, res) {

        Apartment.find({})
            .then( (apartments) => {
                res.render('admin/apartment-add', { apartments: apartments });
            });   
    },

    //Create new apartment
    create(req, res){
        const apartmentProps = req.body;
        Apartment.create(apartmentProps)
            .then( () => Apartment.find({}).sort({date: -1 }))
                .then( apartments => {                
                    res.render('admin/apartments-list', { apartments: apartments });
            });
    },

    //Edit form apartment
    editForm(req, res){

        const id = req.params.id;
        //console.log(id);
        Apartment.findById({ _id: id })
            .then( (apartment) => {
                //res.send(apartment);
                res.render('admin/apartment-edit', { apartment: apartment });
            })
    },

    //Edit form apartment
    editUpdate(req, res){
        const apartmentProps = req.body;
        const id = req.params.id;

        Apartment.findByIdAndUpdate({ _id: id }, apartmentProps)
            .then( () => Apartment.find({}))
                    .then( (apartments) => {
                        res.render('admin/apartments-list', { apartments: apartments });
                    })
    },

    //Delete apartment 
    delete(req, res){

        const id = req.params.id;

        Apartment.findByIdAndRemove({ _id: id })
            .then(() => Apartment.find({}))
                .then( (apartments) => {
                res.render('admin/apartments-list', { apartments: apartments });
            })
    },


    //upload image form
    image(req, res){
        res.render('admin/image-upload-form');
    },
    //image upload process
    imageUplaod(req, res){
        res.send('test');
    },


    //Intro Route
    getIntro(req, res){
        ApartmentIntro.findOne({})
            .then( intro => {
                res.render('admin/apartment-intro', { intro: intro });
                //res.send('inro');
            });
    },

    introForm(req, res){
        res.render('admin/apartment-intro-add');
    },

    addIntro(req, res){
        const introProps = req.body;
        
        ApartmentIntro.create(introProps)
            .then(() => ApartmentIntro.findOne({}))
                .then( intro => { 
                    res.render('admin/apartment-intro', { intro: intro });
                });
    },

    editIntroForm(req, res){
        
        const id = req.params.id;

        ApartmentIntro.findById({ _id: id })
            .then( intro => {
                res.render('admin/apartment-intro-edit', { intro: intro });
            });
    },

    editIntro(req, res){

        const introProps = req.body;
        const id = req.params.id;
        
        ApartmentIntro.findByIdAndUpdate({_id: id }, introProps)
            .then(() => ApartmentIntro.findOne({}))
                .then( intro => { 
                    res.render('admin/apartment-intro', { intro: intro });
                });
    

    },

    //Add facility form 
    facility(req, res){

        const id = req.params.id;
        Apartment.findById({ _id: id })
        .then( apartment => {
            const newFacility = { 
                title: req.body.title, 
                value: req.body.value
            }
            apartment.facilities.push(newFacility);
            apartment.save()
            .then(apartment => {
                res.render('admin/apartment-edit', { apartment: apartment });
            });
        })     
        
    },


    //Delete Facility 
    facilityEdit(req, res){
        const id = req.params.id;
        const newFac = req.body;

        // console.log(id);
        // console.log(facId);

        Apartment.findOneAndUpdate({ 'facilities._id' : id }, newFac)
            //.populate('facilities')
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });
         },

    //Delete Facility 
    facilityDelete(req, res){
        const id = req.params.id;
        //const facId = req.parame.facID;

        // console.log(id);
        // console.log(facId);

        Apartment.findOne({ 'facilities._id' : id })
            //.populate('facilities')
            .then(fac => {
                    fac.facilities.pull({ _id : id });
                    fac.save()
                    .then(apartment => {
                        res.render('admin/apartment-edit', { apartment: apartment });
                    });
            })
         }




}