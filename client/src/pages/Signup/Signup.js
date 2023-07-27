// import React, { useState } from "react";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would call your mutation or API to create a user with formData
//     // For now, we will just log the formData to console
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input type="password" name="password" value={formData.password} onChange={handleChange} />
//       </label>
//       <br />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default Signup;
