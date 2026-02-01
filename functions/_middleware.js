export async function onRequest(context){
    const { request, next, env } = context;

    //get the password from browser's request
    const auth = request.headers.get("Authorization");

    const expectedAuth = "Basic " + btoa(`admin:${ env.MY_PASS }`);

    //check if the auth headers match with the expected auth string
    if(auth !== expectedAuth){
        //if not return an unauthorized response with code 401
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                //this header triggers the login page
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        });
    }

    //if user already logged in let them in
    return await next();
}
