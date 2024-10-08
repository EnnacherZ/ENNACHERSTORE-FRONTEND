// ShoeUpload.tsx
import React, { useState, ChangeEvent, FormEvent, } from 'react';
import Header from './header';
import axios from 'axios';


const ShoeUpload: React.FC = () => {
  const [res, setRes] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [ref, setRef] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [isNewest, setIsNewest] = useState<boolean>(false);
  const [promo, setPromo] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File>();
  

  const handleChangeImage = (event : ChangeEvent<HTMLInputElement>) =>{
    if (event.target.files && event.target.files.length>0){
        setSelectedFile(event.target.files[0])
    }
  }
  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    const data = JSON.stringify({
      category: category,
      ref: ref,
      name: name,
      price: price,
      promo : promo,
      newest : isNewest,
    
    });
    formData.append('data', data);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }
    try {
      const response = await axios.post('http://10.25.30.114:1011/api/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setRes(response.data.message);
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setRes('Erreur lors de la requête');
    }
  };

  return (
    <div>
        <Header/>

<form style={{position:'absolute', top:120, width:'100%' }}  onSubmit={handleSubmit}>
  <input 
    type="text" 
    placeholder="Category" 
    value={category} 
    onChange={(e) => setCategory(e.target.value)} 
  />
  <br/>
  <input 
    type="text" 
    placeholder="Reference" 
    value={ref} 
    onChange={(e) => setRef(e.target.value)} 
  />
  <br/>
  <input 
    type="text" 
    placeholder="Name" 
    value={name} 
    onChange={(e) => setName(e.target.value)} 
  />
  <br/>
  <input 
    type="number" 
    placeholder="Price" 
    step={0.01}
    value={price} 
    onChange={(e) => setPrice(e.target.valueAsNumber)} 
  />
  <input type="number" placeholder='promo' min={0} max={100} value={promo} onChange={(e)=>setPromo(e.target.valueAsNumber)}/>
  <br/>
  <input type='checkbox' onChange={(e) => setIsNewest(e.target.checked)}/>
  <input type="file" onChange={handleChangeImage} />
  <br/>
  <button type="submit">Upload Shoe</button>
</form>


    <div style = {{position:'absolute', }}>

    </div>


    </div>
    
  );
};

export default ShoeUpload;
