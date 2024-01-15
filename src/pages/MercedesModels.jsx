import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define logos for each Mercedes model
const mercedesModelsLogos = {
  'Mercedes A-Class': './brands/Mjg1ZWJiZTQtN2JkZC00YjIyLWFlMjAtYTk5Y2M2ZTY2M2U2_0d43d8f8-6175-45cb-91df-e4bce471610arulecf-450.avif',
  'Mercedes B-Class': './brands/NzJhNWVmNWYtMDRkNi00MzA4LTkyZTgtMjZhYTM5MmU5OTMz_1caae9cc-176d-41ef-81aa-aafd97c8615frulecf-450.avif',
  'Mercedes C-Class': './brands/MDY5MTA3NDUtMjc0ZC00MDAzLWFhMDgtYjY0NTQwNDE0MWFi_6e4eca57-f8ea-49ba-af05-ca54f62d0d1brulecf-450.avif',
  'Mercedes Citan': './brands/MjQ4ZDk2MDEtYjUyOC00NGI3LWE1YTQtNDQ3NTc5Nzk1OWQ1_8a1aef97-1032-4cf5-9b92-f6faff8ad8fdrulecf-450.avif',
  'Mercedes CL': './brands/OGY1NDA3YTctODU5ZS00N2ZhLTkxYTAtZjExNzE4MmIyZDc4_1e3680bc-3440-4b93-95af-9c4784802a2erulecf-450.avif',
  'Mercedes CLA / CLA Shooting Brake': './brands/MWI3ZTllNWItMTM4Ny00NDFjLTg3YjYtMzUwYmRiZWQ2YjI3_1374c28a-5e19-4ade-86a4-6a4a989664c7rulecf-450.avif',
  'Mercedes CLS': './brands/YzNjYjI2YjctNWNkYS00M2JiLWE0OGItNmJmOWY2NmRlMzEw_35636d5e-d56c-42df-98f9-20d2108c3c39rulecf-450.avif',
  'Mercedes E-Class': './brands/M2QzN2UwOTMtYmVhOC00YjRmLWFkNWMtNGVjN2ZlODIxZWQy_d9d33797-880c-41a8-a2b7-55ebec9edc99rulecf-450.avif',
  'Mercedes G-Class': './brands/MjBlYzg3NTYtOTc5Yy00ODRjLWJhYmUtY2MwYWFkYWMzNjkz_76d9b191-3a0f-48dc-9517-5087a40eae43rulecf-450.avif',
  'Mercedes GL': './brands/ZDMzOTdmYTEtYjlhYS00MWY2LWI2NmMtNTE2OTZiZjM2YzE2_6417533f-d975-4a71-bb9d-16ea0ea92e31rulecf-450.avif',
  'Mercedes GLA': './brands/MzgzY2M3ZmQtMGY3Ny00ZmRmLTk4ZmItMTg5MzNiYjQ0ODNj_f2b354f3-a743-43fb-bd1e-dd9245d64142rulecf-450.avif',
  'Mercedes GLC': './brands/MjE3MWFlNzUtNTQ3ZC00ZGMwLTkwMTctZTBlNmU3MmRhZjNl_6d3f8eef-fb9e-459e-9370-74c92d6a99c5rulecf-450.avif',
  'Mercedes GLE': './brands/MzNjNDM1MzAtODhjYS00YzhmLTg1M2EtNDc5MzllNjgxNjNm_061c34f3-b2a1-4a8d-89f3-d5a63500a4b2rulecf-450.avif',
  'Mercedes GLK': './brands/MDhkODY5MzctMjYxMC00ODMxLTk0NjMtMGVmMzY1OTQ2OTFi_078b1561-546b-4d97-8ca3-28ea4634dfb1rulecf-450.avif',
  'Mercedes GLS': './brands/YjdkYzQyNzgtYTNlMS00MzE4LWI5MDAtM2RlMzdmMjkzYTYw_4a94a8a0-9829-46f4-a3d1-33aebf8267b5rulecf-450.avif',
  'Mercedes S-Class': './brands/NmM0ZTM1NjktNzRlMy00MTc4LTkxYjEtYTBhMjNlNTE0ZjM5_00a3dbf2-bd29-455a-a1e8-76d518260fa2rulecf-450.avif',
  'Mercedes SL': './brands/MGU3NjBjOTQtZGY1Mi00MTlhLThjOWEtNjQxOGY4OTQwZWI1_d9fd75eb-80d8-48fc-9775-8c68bee7376arulecf-450.avif',
  'Mercedes SLK': './brands/NDczMDE0ZGYtNjgxOC00NjI0LTkyZTgtZWE2YTAxNDdkYzU3_98c41208-4cb1-4fde-a775-366056a9b592rulecf-450.avif',
  'Mercedes SLS AMG': './brands/ZWYxYWM5NTYtNzU4OC00ZGQ4LTg5MGUtZTI2YTMwZDUzODZh_6326d44d-504a-4526-b876-6e6fc8f49670rulecf-450.avif',
  'Mercedes AMG GT': './brands/YzIxZGU4MzItMjc0OC00YjQxLWI1NWEtZmMwNGRiOGJlZmJk_4fcadb7a-deb7-499b-a694-52164533c18arulecf-450.avif',

};

const MercedesModels = () => {
  const mercedesModels = [
    'Mercedes A-Class',
    'Mercedes B-Class',
    'Mercedes C-Class',
    'Mercedes Citan',
    'Mercedes CL',
    'Mercedes CLA / CLA Shooting Brake',
    'Mercedes CLS',
    'Mercedes E-Class',
    'Mercedes G-Class',
    'Mercedes GL',
    'Mercedes GLA',
    'Mercedes GLC',
    'Mercedes GLE',
    'Mercedes GLK',
    'Mercedes GLS',
    'Mercedes S-Class',
    'Mercedes SL',
    'Mercedes SLK',
    'Mercedes SLS AMG',
    'Mercedes AMG GT',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow mt-24 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        {mercedesModels.map((model, index) => (
          <div key={index} className="brand-wrapper">
            <div className="bg-white rounded p-4 text-center shadow-md" style={{ maxWidth: '200px', height: '300px', margin: 'auto' }}>
              <img
                src={mercedesModelsLogos[model]}
                alt={`${model} logo`}
                className="mx-auto mb-4"
                style={{ width: '100%', height: 'auto', maxHeight: '150px' }}
              />
              <h2 className="text-xl font-bold">{model}</h2>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MercedesModels;
