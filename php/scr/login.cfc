        <cfcomponent>
        <cfheader name="Access-Control-Allow-Origin" value="*">

        <cffunction name="queryToJSON" returntype="string" access="public" output="yes">
          <cfargument name="q" type="query" required="yes" />
          <cfset var o=ArrayNew(1)>
          <cfset var i=0>
          <cfset var r=0>
          <cfloop query="Arguments.q">
            <cfset r=Currentrow>
            <cfloop index="i" list="#LCase(Arguments.q.columnList)#">
              <cfset o[r][i]=Evaluate(i)>
            </cfloop>    
          </cfloop>
          <cfreturn SerializeJSON(o)>
        </cffunction>



        <cffunction name="loginCheck" access="remote" returntype="any" > 
            <cfset loginData = deserializeJSON(ToString(getHTTPRequestData().content))>
            <cfset pw = Hash(#loginData.password#, "SHA-256")>
            <cfset log = #loginData.email#>

            <cfquery name="logq" datasource="zbdb" > 
                SELECT id, email, name, inits,  FROM scr_users WHERE email = '#log#' AND password = '#pw#' 
            </cfquery> 
            <cfset myJSON=queryToJSON(logq)>
            <cfreturn #myJSON#>
        </cffunction>

</cfcomponent>