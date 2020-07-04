$(document).ready(function(){
  $.ajax({
    url : "../../includes/menu.html",
    type : 'get',
  })
  .done(function(data){
    $('.menuInclude').append(data)
    var url = window.location.pathname.replace("/index.html", "").replace("/form.html", "").split("/");
    var pagina = url[url.length - 1];
    $(`.${pagina}`).addClass("active");
    $(`.${pagina}`).attr("href", "#");
  });

  $.ajax({
    url : "../../includes/header.html",
    type : 'get',
  })
  .done(function(data){
    $('.dashboard-header').append(data);
    const user = stash.get('user');
    if(user !== undefined)
      $('.nav-user-name').html(`${user.nomefantasia}`);
    $('.logout').click(function(){
      const url = $(this).attr("link");
      stash.cut('user'); // remover do localstorage
      window.location.href = url;
    });
  });

  $.ajax({
    url : "../../includes/footer.html",
    type : 'get',
  })
  .done(function(data){
    $('.footer').append(data)
  });

  $(".cep").blur(function() {
    const cep = $(this).val();
    $.ajax({
      url : `https://viacep.com.br/ws/${cep}/json/`,
      type : 'get',
    })
    .done(function(data){
      $('.rua').val(data.logradouro);
      $('.bairro').val(data.bairro);
      $('.cidade').val(data.localidade);
      $('.uf').val(data.uf);
    });
  }); 
});