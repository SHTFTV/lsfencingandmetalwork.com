import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sendBrowserNotification } from '../../src/lib/lead-browser-delivery.ts';
const mail={subject:'Test',text:'Test only',email:'test@example.com',name:'Test'};
for(const [name,body,want] of [
 ['accepted',{success:'true',message:'Email sent successfully'},true],
 ['activation is not delivery',{success:'true',message:'Please activate your email'},false],
 ['provider rejection',{success:false},false],
] as const) test(name,async()=>{
 const old=globalThis.fetch;
 globalThis.fetch=async (url,init)=>{
  assert.equal(url,'https://formsubmit.co/ajax/lsfencingandmetalwork%40gmail.com');
  const payload=JSON.parse(String(init?.body));
  assert.equal(payload._replyto,'test@example.com');
  assert.equal(payload._captcha,undefined);
  return Response.json(body);
 };
 try {assert.equal(await sendBrowserNotification(mail),want)} finally {globalThis.fetch=old}
});
