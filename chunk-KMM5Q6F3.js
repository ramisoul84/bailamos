import{a as n}from"./chunk-7EQBCLUI.js";import{V as o,j as i,m as s}from"./chunk-QY7NKWSR.js";var p=(()=>{let t=class t{constructor(r){this.http=r,this.serverUrl=n.serverUrl}getAllUsers(){return this.http.get(`${this.serverUrl}/user`)}getUser(r){return this.http.get(`${this.serverUrl}/user/${r}`)}};t.\u0275fac=function(c){return new(c||t)(s(o))},t.\u0275prov=i({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{p as a};
