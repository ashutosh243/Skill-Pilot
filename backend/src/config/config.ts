import dotenv from 'dotenv';
dotenv.config();


const config={
      port:process.env.PORT||5000,
      mongoUrl:process.env.MONGOURL||"",
      jwtsecret:process.env.jwtsecret||"",
      model:process.env.model||"groq",
      email:process.env.email||"",
      password:process.env.password||"",
      tavily:process.env.tavily||"",
      pine_cone_api_key:process.env.pine_cone_api_key||"",
      pine_cone_index:process.env.pine_cone_index||""

}
export default config;