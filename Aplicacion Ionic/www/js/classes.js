class Usuario {

    constructor (pUsuario, pPassword, pIdDepartamento, pIdCiudad){

        this.usuario = pUsuario;
        this.password = pPassword;
        this.idDepartamento = pIdDepartamento;
        this.idCiudad = pIdCiudad;
    }
 }

class Gasto{

    constructor(pIdUsuario, pConceptoIngreso, pRubroDeIngreso, pMedioDeIngreso, pTotalIngreso, pFechaIngreso){
       
        this.idUsuario = pIdUsuario;
        this.concepto = pConceptoIngreso;
        this.categoria = pRubroDeIngreso;
        this.total = pTotalIngreso;
        this.medio = pMedioDeIngreso; 
        this.fecha= pFechaIngreso;

    }
}

class Ingreso{

    constructor(pIdUsuario, pConceptoIngreso, pRubroDeIngreso, pMedioDeIngreso, pTotalIngreso, pFechaIngreso){
       
        this.idUsuario = pIdUsuario;
        this.concepto = pConceptoIngreso;
        this.categoria = pRubroDeIngreso;
        this.total = pTotalIngreso;
        this.medio = pMedioDeIngreso; 
        this.fecha= pFechaIngreso;

    }
}
