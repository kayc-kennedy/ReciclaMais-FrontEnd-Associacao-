$(document).ready(async function(){
  arv = new Arvore();
  if(stash.get('alertSuccess') != "" && stash.get('alertSuccess') != undefined){
    let msg = stash.get('alertSuccess');
    stash.cut('alertSuccess');
    $.notify({
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
  var t = $('#table').DataTable();
  const user = stash.get('user');
  if(user){
    const res = await axios.get(`http://localhost:3000/catador/${user.idassociacao}`);
    const response = res.data;
    if (response.error === undefined || response.error === '') {
      const catadores = response.catadores;
      catadores.map(function(catador) {
        arv.inserir({id: catador.idcoletor, catador});  
        t.row.add( [
          `<a id_delete="${catador.idcoletor}" class="deletar" href="#"><i class="fas far fa-trash-alt"></i></a>`,
          `<a class="editar" style="cursor:pointer;"  id_catador="${catador.idcoletor}"> <i class="fas fa-pencil-alt"></i></a>`,
          catador.coletor,
          catador.cpf,
          catador.telefone
        ] ).draw( false );
      });
    }  
  }
  $('.editar').click(function(){
    const id = $(this).attr("id_catador");
    const catador = arv.buscar(parseInt(id));
    console.log(catador);
    console.log(typeof id);
    stash.set('catador', catador);
    window.location.href = `./form.html?cd=${id}`;
  });

  $('.deletar').click(async function(e) {
    var id = $(this).attr('id_delete');
    e.preventDefault();
    bootbox.confirm({
      message: 'Realmente deseja apagar este registro?',
      centerVertical: true,
      buttons: {
        confirm: {
          label: 'Sim',
          className: 'btn-danger',
        },
        cancel: {
          label: 'Não',
          className: 'btn-primary',
        },
      },
      async callback(result) {
        if(result){ // se clicar em sim
          const res = await axios.delete(`http://localhost:3000/catador/${id}`);
          const response = res.data;
          if (response.error === undefined || response.error === '') {
            stash.set('alertSuccess', 'Catador Excluído com succeso!');
            window.location.href = './index.html';
          }else{
            $.notify({
                message: "Ops... Não foi possível excluír o catador, tente novamente em alguns instantes."
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
      },
    });
  })
});

