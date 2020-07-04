$(document).ready(async function(){
  const searchParams = new URLSearchParams(window.location.search)//buscando os parametros passados na 'url'
  // console.log(searchParams.get('cd'));
  // console.log(searchParams.has('cd'));//verificando se possui 
  if(searchParams.has('cd')){  
    const {catador} = stash.get('catador');
    console.log(catador);
    $("#nome_coletor").val(catador.coletor);
    $("#cpf_coletor").val(catador.cpf);
    $("#celular_coletor").val(catador.telefone);
    $("#cep_coletor").val(catador.cep);
    $("#numero_coletor").val(catador.numero);
    $("#tipo_lixo_coletor").val(catador.preferenciacoleta);
    $("#rua_coletor").val(catador.rua);
    $("#bairro_coletor").val(catador.bairro);
    $("#cidade_coletor").val(catador.cidade);
    $("#uf_coletor").val(catador.uf);
  }

  $('.btnSubmit').click(async function(){
    let form = $(this).parents('form:first');
    let returnValidation = await validation(form);
    if(returnValidation === true){
      const user = stash.get('user');
      if(searchParams.has('cd')){
        const id_catador = searchParams.get('cd');
        const nome = $("#nome_coletor").val();
        const cpf = $("#cpf_coletor").val();
        // const preferencia_coleta = 1;
        const preferencia_coleta = $("#tipo_lixo_coletor").val();
        const telefone = $("#celular_coletor").val();
        const cep = $("#cep_coletor").val();
        const numero = $("#numero_coletor").val();
        const rua = $("#rua_coletor").val();
        const bairro = $("#bairro_coletor").val();
        const cidade = $("#cidade_coletor").val();
        const uf = $("#uf_coletor").val();
        const id_associacao = user.idassociacao;
        const status = "A";
        const res = await axios.put(`http://localhost:3000/catador/atualizar`, {
          id_catador,  
          nome,
          cpf,
          preferencia_coleta,
          telefone,
          cep,
          numero,
          rua,
          bairro,
          cidade,
          uf,
          id_associacao,
          status
        });
        const response = res.data;
        if (response.error === undefined || response.error === '') {
          stash.set('alertSuccess', 'Catador atualizado com succeso!');
          window.location.href = './index.html';
        }else{
          $.notify({
              message: "Ops... Não foi possível atualizar o catador, tente novamente em alguns instantes."
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
      }else{
        const nome = $("#nome_coletor").val();
        const cpf = $("#cpf_coletor").val();
        const preferencia_coleta = 1;
        const telefone = $("#celular_coletor").val();
        const cep = $("#cep_coletor").val();
        const numero = $("#numero_coletor").val();
        const rua = $("#rua_coletor").val();
        const bairro = $("#bairro_coletor").val();
        const cidade = $("#cidade_coletor").val();
        const uf = $("#uf_coletor").val();
        const id_associacao = user.idassociacao;
        const res = await axios.post(`http://localhost:3000/catador`, {
          nome,
          cpf,
          preferencia_coleta,
          telefone,
          cep,
          numero,
          rua,
          bairro,
          cidade,
          uf,
          id_associacao
        });
        const response = res.data;
        if (response.error === undefined || response.error === '') {
          stash.set('alertSuccess', 'Catador inserido com succeso!');
          window.location.href = './index.html';
        }else{
          $.notify({
              message: "Ops... Não foi possível criar o catador, tente novamente em alguns instantes."
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

