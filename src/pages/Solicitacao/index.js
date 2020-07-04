$(document).ready(async function(){
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
  var t = $('#table').DataTable();
  const user = stash.get('user');
  if(user){
    const res = await axios.get(`http://localhost:3000/solicitacoes/${user.idassociacao}`);
    const response = res.data;

    if (response.error === undefined || response.error === '') {
      const solicitacoes = response.solicitacoes;
      solicitacoes.map(function(solicitacao) {
        let status;
        switch (solicitacao.status) {
          case "P":
            status = "PENDENTE";
            break;
          case "E":
            status = "EM COLETA";
            break;
          case "F":
            status = "FINALIZADA";
            break;
          case "C":
            status = "CANCELADA";
            break;
        
          default:
            break;
        }
        t.row.add( [
          `<a href="./form.html?cd=${solicitacao.idsolicitacao}"> <i class="fas fa-pencil-alt"></i></a>`,
          solicitacao.nomeusuario,
          solicitacao.telefone,
          (solicitacao.coletor ? solicitacao.coletor : 'Nenhum coletor alocado'),
          solicitacao.cidade+"/"+solicitacao.uf,
          status,
        ] ).draw( false );
      });
    }     
  }
});

