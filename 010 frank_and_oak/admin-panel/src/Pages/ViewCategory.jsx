import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip, Tooltip } from 'react-tooltip';
import Swal from "sweetalert2";
import { ImBin } from "react-icons/im";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaTrashRestore, FaTrashRestoreAlt } from "react-icons/fa";
import { GiH2O } from "react-icons/gi";

const ViewCategory = () => {
  let [show1, setShow1] = useState(false);
  let [show2, setShow2] = useState(false);
  let [show3, setShow3] = useState(false);
  let [show4, setShow4] = useState(false);

  const [category,setCategorys] = useState([]);
  const [deletedCategorys,setDeletedCategorys] = useState([]);
  const [checked,setChecked] = useState([]);
  const [ifAllChecked,setIfAllChecked] = useState(false);
  const [open, setOpen] = useState(false);

  const fatchCategory = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/read-category`)
    .then((response)=>{
      // console.log(response.data);
      setCategorys(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  const fatchDeletedCategory = ()=>{
    axios.get(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/deleted-categorys`)
    .then((response)=>{
      // console.log(response.data);
      setDeletedCategorys(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  useEffect(()=>{
    fatchCategory(); fatchDeletedCategory(); },[]);


  const handleUpdateStatus = (e)=>{
    const status = e.target.textContent !== 'Active' ;

    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/updata-status/${e.target.value}`, {status})
    .then((response)=>{
      console.log(response.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Status Updated",
        showConfirmButton: false,
        timer: 500
      });

      const index = category.findIndex((cat)=> cat._id === e.target.value)
      const newdata = [...category];

      newdata[index].status=status;

      setCategorys(newdata);

    })
    .catch((error)=>{
      console.log(error);
    })
  };

  const  handleDeleteCategory = (id)=>{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/delete-category/${id}`)
        .then((response)=>{
          
          setCategorys((pre)=>(
            pre.filter((category)=> category._id !== id)
          ))
          Swal.fire({
            title: "Deleted!",
            text: "Your Category has been deleted.",
            icon: "success"
          });
          fatchDeletedCategory();
        })
        .catch((error)=>{
          console.log(error);
        });
      }
    });
   
  };

  const handleCheck =(e)=>{
    // console.log(e.target.checked);
    if(e.target.checked){
      setChecked([...checked, e.target.value])
    }else{
      setChecked((pre)=>(
        pre.filter((id)=> id !==  e.target.value)
      ))
    }
  };

  const handleAllCheck = (e)=>{
    setIfAllChecked(e.target.checked);

    if(e.target.checked){
      setChecked(category.map((item)=> item._id));
    }else{
      setChecked([]);
    }
  };

  useEffect(()=>{
    setIfAllChecked(category.length ===  checked.length && category.length !== 0);

  },[category,checked])
  
  const handleMultiDelete =()=>{
    console.log(checked)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/delete-multiple-categorys`, {ids:checked})
        .then((response)=>{
          
          setCategorys((pre)=>(
            pre.filter((item)=> !checked.includes(item._id))
          ));
          // fatchCategory();
          setIfAllChecked(false);
          setChecked([]); 

          Swal.fire({
            title: "Deleted!",
            text: "Your Category has been deleted.",
            icon: "success"
          });
        })
        .catch((error)=>{
          console.log(error);
        });
      }
    });
  };
 
  const handleRestoreCategory = (id) =>{
    axios.put(`${process.env.REACT_APP_API_HOST}/api/admin-panel/parent-category/restore-category/${id}`)
    .then(()=>{
      fatchCategory();
      fatchDeletedCategory();
      // setOpen(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <Tooltip id="my-tooltip" />
      <div className="flex justify-between h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
       <h4> View Category</h4>
       <span>
        <ImBin className="cursor-pointer" onClick={()=>{setOpen(true)}}/>
       </span>
      </div>
      <Modal open={open} onClose={()=>{setOpen(false)}} center>
        {
          (deletedCategorys.length === 0) ? (<h2>no data in bin</h2>) : (
            <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>
                 <button 
                 className="bg-red-400 rounded-sm px-2 py-1 mx-2"
                 >Delete</button>
                  <input
                   type="checkbox"
                   name="deleteAll"
                   id="deleteAllCat"
                   onClick={handleAllCheck }
                   className="accent-[#5351c9] cursor-pointer"
                   checked={ifAllChecked}
                  />
                </th>
                <th>Sno</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              deletedCategorys.map((category,index)=>(
                <tr className="border-b" key={index}>
  
                <td>
                  <input
                    type="checkbox"
                    name="delete"
                    id="delete1"
                    value={category._id}
                    className="accent-[#5351c9] cursor-pointer"
                    onClick={handleCheck}
                    checked={checked.includes(category._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td className="w-[200px] flex-wrap p-1">
                  {category.discription}
                  <span
                    onClick={() => setShow1(!show1)}// categroy
                    className={
                      show1 === true ? "hidden" : "font-bold cursor-pointer"
                    }
                  >
                    ...Read
                  </span>
                  {show1 === false ? (
                    " "
                  ) : (
                    <span>
                      Deserunt nam est delectus itaque sint harum architecto.
                    </span>
                  )}
                </td>
                <td className="flex items-center">
                  <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" 
                  onClick={()=>{handleDeleteCategory(category._id)}}/>{" "}
                  |{" "}
                  <FaTrashRestoreAlt onClick={()=>{handleRestoreCategory(category._id)}} className="cursor-pointer"/>
                </td>
                
              </tr>
              ))
            }
            </tbody>
          </table>
          )
        }
     
      </Modal>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
               <button 
               className="bg-red-400 rounded-sm px-2 py-1 mx-2"
               onClick={handleMultiDelete}
               >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheck }
                  className="accent-[#5351c9] cursor-pointer"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {
            category.map((category,index)=>(
              <tr className="border-b" key={index}>

              <td>
                <input
                  type="checkbox"
                  name="delete"
                  id="delete1"
                  value={category._id}
                  className="accent-[#5351c9] cursor-pointer"
                  onClick={handleCheck}
                  checked={checked.includes(category._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td className="w-[200px] flex-wrap p-1">
                {category.discription}
                <span
                  onClick={() => setShow1(!show1)}// categroy
                  className={
                    show1 === true ? "hidden" : "font-bold cursor-pointer"
                  }
                >
                  ...Read
                </span>
                {show1 === false ? (
                  " "
                ) : (
                  <span>
                    Deserunt nam est delectus itaque sint harum architecto.
                  </span>
                )}
              </td>
              <td>
                <MdDelete onClick={()=>{handleDeleteCategory(category._id)}} className="my-[5px] text-red-500 cursor-pointer inline" />{" "}
                |{" "}
                <Link to={`/dashboard/category/update-category/${category._id}`}>
                  <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                </Link>
              </td>
              <td>
                <button
               data-tooltip-id="my-tooltip"
               value={category._id} 
               onClick={handleUpdateStatus}
               data-tooltip-content={(category.status) ? 'Inactive' : 'Active'}
                className={`p-[4px_10px] rounded-sm ${(category.status) ? 'bg-green-500' : 'bg-red-600'}  text-white`}
                >
                 {(category.status) ? 'Active' : 'Inactive'}
                </button>

              </td>
            </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
