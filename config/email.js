/**
 * Created by user on 12/6/2016.
 */
var nodemailer = require('nodemailer');
fs = require('fs');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://chp.testbed%40gmail.com:chp_testbed_2016@smtp.gmail.com');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'chp.testbed@gmail.com',
        pass: 'chp_testbed_2016'
    },
});
/*

fs.readFile('template/training_template.html', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    data = data.replace('[trainee_name]', 'trainee_name');
    data = data.replace('[training_name]', 'training_name');
    data = data.replace('[start_date]', 'start_date');
    data = data.replace('[end_date]', 'end_date');

    //console.log(data);
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"christian.nankam@orange.com', // sender address
        to: 'chp.testbed@gmail.com', // list of receivers
        subject: 'Planned Training', // Subject line
        html: data // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});
*/

exports.sendMail = function (email, trainee_name, training_name, start_date, end_date) {

    fs.readFile('config/template/training_template.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace('[trainee_name]', trainee_name);
        data = data.replace('[training_name]', training_name);
        data = data.replace('[start_date]', start_date);
        data = data.replace('[end_date]', end_date);

        //console.log(data);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"christian.nankam@orange.com', // sender address
            to: email, // list of receivers
            subject: 'Planned Training', // Subject line
            html: data // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    });

};


exports.sendQuizMail = function (email, trainee_name, quiz_name) {

    fs.readFile('config/template/quiz_template.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace('[trainee_name]', trainee_name);
        data = data.replace('[quiz_name]', quiz_name);

        //console.log(data);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"christian.nankam@orange.com', // sender address
            to: email, // list of receivers
            subject: 'Planned Quiz', // Subject line
            html: data // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    });

};
