$(document).ready(async function(){
  moment.locale('pt-br');
  const searchParams = new URLSearchParams(window.location.search)//buscando os parametros passados na 'url'
  console.log(searchParams.get('cd'));
  console.log(searchParams.has('cd'));//verificando se possui 

  const user = stash.get('user');
  if(user){
    const res = await axios.get(`http://localhost:3000/catador/${user.idassociacao}`);
    const response = res.data;

    if (response.error === undefined || response.error === '') {
      const catadores = response.catadores;
      var $dropdown = $("#idcoletor_solicitacao");
        $.each(catadores, function() {
            $dropdown.append($("<option />").val(this.idcoletor).text(this.coletor));
        });
    }     
  }
  if(searchParams.has('cd')){
    const user = stash.get('user');
    const solicitacao = searchParams.get('cd');
    if(user){
      const res = await axios.get(`http://localhost:3000/solicitacoes/${user.idassociacao}/${solicitacao}`);
      const response = res.data;
      if (response.error === undefined || response.error === '') {
        const solicitacao = response.solicitacao[0];
        $("#data_solicitacao").val(moment(solicitacao.datahorasolici).format('LLL'));
        $("#status_solicitacao").val(solicitacao.status);
        $("#nome_solicitacao").val(solicitacao.nomeusuario);
        $("#idcoletor_solicitacao").val(solicitacao.idcoletor);
        $("#telefone_solicitacao").val(solicitacao.telefone);
        $("#cep_solicitacao").val(solicitacao.cep);
        $("#numero_solicitacao").val(solicitacao.numero);
        $("#rua_solicitacao").val(solicitacao.rua);
        $("#bairro_solicitacao").val(solicitacao.bairro);
        $("#cidade_solicitacao").val(solicitacao.cidade);
        $("#uf_solicitacao").val(solicitacao.uf);
      }   
    }
  }

  $('.btnSubmit').click(async function(){
    let form = $(this).parents('form:first');
    let returnValidation = await validation(form);
    if(returnValidation === true){
      const user = stash.get('user');
      if(searchParams.has('cd')){
        const id_solicitacao = searchParams.get('cd');
        const id_associacao = user.idassociacao;
        const status = $("#status_solicitacao").val();
        const id_catador = $("#idcoletor_solicitacao").val();
        const res = await axios.put(`http://localhost:3000/solicitacoes/atualizar`, {
          id_solicitacao, 
          status,
          id_catador,
          id_associacao
        });
        const response = res.data;
        if (response.error === undefined || response.error === '') {
          stash.set('alertSuccess', 'Solicitação atualizada com succeso!');
          window.location.href = './index.html';
        }else{
          $.notify({
              message: "Ops... Não foi possível atualizar o solicitacao, tente novamente em alguns instantes."
            },{
              placement: {
                from: "top",
                align: "right",
              },
              timer: 100,
              // settings
              type: 'danger',
              animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
              },
          });
        }
      }
    }else{
      $('.formError').fadeIn().html(returnValidation);
    }
    
  });

  async function validation(form){
    let msg = "";
  
    form.find(".required").each(function(){
      if( $(this).val() == "" ){
          msg += '<div><i class="mdi mdi-information-outline"></i>&nbsp;&nbsp;<span>'+$(this).attr("description")+'</span>.</div>';
      }
    });
    if( msg != "" ){
        return '<div style="font-weight:500">Os campos abaixo são obrigatórios:</div>'+msg;
    } else {
        return true;
    }
  }
});

