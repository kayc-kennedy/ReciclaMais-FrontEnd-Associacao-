/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
if(stash.get('alertSuccess') != "" && stash.get('alertSuccess') != undefined){
  let msg = stash.get('alertSuccess');
  stash.cut('alertSuccess');
  $.notify({
    // options
    // title: 'Be Alert,',
    message: msg
  },{
      placement: {
        from: "top",
        align: "right",
      },
      timer: 100,
      // settings
      type: 'success',
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
      },
  });
}
const signin = async (userData) => {
  const textError = document.getElementById('textError');
  const loading = document.getElementById('loading');
  const textButton = document.getElementById('textButton');

  loading.style.display = 'block';
  textButton.style.display = 'none';

  const { emailUser: mail, passwordUser: senha } = userData;
  const res = await axios.post('http://localhost:3000/login-associacao', {
    mail,
    senha
  });
  const response = res.data;
  loading.style.display = 'none';
  textButton.style.display = 'block';
  
  if (response.error) {
    textError.innerHTML = response.error;
    textError.style.display = 'block';
  } else {
    console.log(response.usuario);
    // set foo
    stash.set('user', response.usuario[0]);
    window.location.href = '../Home/index.html';

    // stash.cut('user'); // remover do localstorage
  }
};
const signinButton = document.getElementById('login');
if (stash.get('user')) {
  window.location.href = '../Home/index.html';
}
signinButton.addEventListener('click', () => {
  const emailUser = document.getElementById('email').value;
  const passwordUser = document.getElementById('password').value;
  signin({ emailUser, passwordUser });
});
