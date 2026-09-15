const BASE=(import.meta.env.VITE_API_URL||'http://localhost:5000/api').replace(/\/$/,'');
const request=async(path,options={})=>{const token=localStorage.getItem('vc-token');const headers={...(options.body instanceof FormData?{}:{'Content-Type':'application/json'}),...options.headers};if(token)headers.Authorization='Bearer '+token;const response=await fetch(BASE+path,{...options,headers});const data=await response.json().catch(()=>({}));if(!response.ok)throw new Error(data.message||'Request failed');return data};
export const api={
 health:()=>request('/health'),
 store:()=>request('/store'),
 products:()=>request('/products'),
 categories:()=>request('/categories'),
 login:(email,password)=>request('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),
 orders:()=>request('/orders'),
 createOrder:body=>request('/orders',{method:'POST',body:JSON.stringify(body)}),
 track:number=>request('/orders/track/'+encodeURIComponent(number)),
 updateOrder:(id,status)=>request('/orders/'+id+'/status',{method:'PATCH',body:JSON.stringify({status})}),
 createProduct:body=>request('/products',{method:'POST',body:JSON.stringify(body)}),
 updateProduct:(id,body)=>request('/products/'+id,{method:'PUT',body:JSON.stringify(body)}),
 deleteProduct:id=>request('/products/'+id,{method:'DELETE'}),
 createCategory:body=>request('/categories',{method:'POST',body:JSON.stringify(body)}),
 deleteCategory:id=>request('/categories/'+id,{method:'DELETE'}),
 updateSettings:body=>request('/store/settings',{method:'PUT',body:JSON.stringify(body)}),
 createArea:body=>request('/store/areas',{method:'POST',body:JSON.stringify(body)}),
 deleteArea:id=>request('/store/areas/'+id,{method:'DELETE'}),
 upload:file=>{const body=new FormData();body.append('file',file);return request('/media',{method:'POST',body})},
 uploadReference:file=>{const body=new FormData();body.append('file',file);return request('/media/reference',{method:'POST',body})}
};