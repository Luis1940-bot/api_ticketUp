//?----------fecha---------------------------------
function fecha_Actual() {
  //?generador de fecha */
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let milsec = date.getMilliseconds();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  this.hoyNormal = year + "-" + month + "-" + day;
  this.hoyMySQL = day + "-" + month + "-" + year;
  this.hora = hour + ":" + min;
}
//?-------------------------------------------------

function fechaActual_dd_mm_yyyy() {
  let fecha = new fecha_Actual();
  return fecha.hoyNormal;
}

function fechaActual_yyyy_mm_dd() {
  let fecha = new fecha_Actual();
  return fecha.hoyMySQL;
}
function fecha_dd_mm_yyyy(date) {
  let fecha = new fecha_Actual();
  return fecha.hoyNormal;
}
function fecha_yyyy_mm_dd(date) {
  let fecha = new fecha_Actual();
  return fecha.hoyMySQL;
}
module.exports = {
  fechaActual_dd_mm_yyyy,
  fechaActual_yyyy_mm_dd,
};
