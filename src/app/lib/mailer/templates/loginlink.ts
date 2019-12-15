const loginlinkTmpl = {
  From: {
    Email: 'smikodanic@gmail.com',
    Name: 'Confi Admin'
  },
  To: [
    {
      Email: '',
      Name: ''
    }
  ],
  Subject: 'Customer registration',
  TextPart: `Dear #user#,
    Someone, hopefully you, requested a new login link.
    You can use the following link to log in into the conferemce.
    #loginlink#
    Access Code: #accesscode#
    Your XYZ team`,
  HTMLPart: `Dear #user#,
  <br><br> Someone, hopefully you, requested a new login link.
  <br>You can use the following link to login into the conference app.
  <br><br> <a href="#loginlink#">#loginlink#</a>
  <br><br>Access Code: <b style="color:gray;font-size:larger;">#accesscode#</b>
  <br><br>Your XYZ team`
};

export { loginlinkTmpl };
