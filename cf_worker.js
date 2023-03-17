const TELEGRAPH_URL = 'https://api.openai.com';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(req) {

  const url = new URL(req.url);
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');
  const authorization = req.headers.get('authorization')
  const Content_Type = req.headers.get('Content-Type') || 'application/json'
  const reqmethod = req.method

  let reqbody
  if (reqmethod === "POST") {
    reqbody = await req.json()
  }
  console.log(reqbody);
  // 创建一个新的请求，指向 OpenAI 的 API
  let newHeaders = new Headers()
  newHeaders.append("Authorization", authorization);
  newHeaders.append("Content-Type", Content_Type);
  const raw = JSON.stringify(reqbody);
  const requestOptions = {
    method: reqmethod,
    headers: newHeaders,
    body: raw,
    redirect: 'follow'
  };



  const response = await fetch(url.toString(), requestOptions);
  // const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  // 添加允许跨域访问的响应头
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse;
}