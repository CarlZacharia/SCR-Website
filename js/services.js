var qc = angular.module('authApp');
qc.service('todosService', function() {
  var todos = [];

 
  var getTodos = function(){
      $http.post('php/scr/scr_gettodos.php', data2).success(function(res) {
      todos = res;
        for(var i =0; i < todos.length; i++)
        {
          var t = new Date(todos[i].duedate);
          todos[i].duedate = t;
        }
      });
      console.log(todos);
      return todos;
      };


  return 
  {
    getTodos: getTodos
   };







});

authApp.factory('foundSnfsZip', function($q, $http) {

  var foundSnfs = {};
  foundSnfs.getsnfs = function (){
    var deferred = $q.defer(); 
 
      var url = "http://data.medicare.gov/resource/hq9i-23gr.json?$where=provider_state='PA'&$order=overall_rating DESC";
      deferred.resolve($http.get(url));

        };

        return deferred.promise;
});