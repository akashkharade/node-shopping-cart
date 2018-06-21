const passport = require('passport');

module.exports = (app) =>{
    app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile', 'email'] }));
      
      app.get(
        '/auth/google/callback' ,
         passport.authenticate('google'),
         (req,res) => {
             res.redirect('http://localhost:4200');
         }
      );

    app.get('/api/current_user', (req, res) => {
        const user = req.user;
        if(user){
          res.send(user);
        }else{
          res.json({error: 'User does not exits'});
        }
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}
