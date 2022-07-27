import Button from "../basic/Button";

const CategoryRow = ({category,navigate,setIsModal,setId}) => {
  const id = category.id;

  return (
    <tr className='table-body-rows'>
                        <td>{category.index + 1}</td>
                        <td>{category.name}</td>
                        <td className='btn-group'>
                        <Button styling={"save"} width={"flex-1"} content={"Edit"} onPress={()=>{navigate(`/editcategory/${id}`)}}/>
                        <Button styling={"danger"} width={"flex-1"} content={"Delete"} onPress={()=>{setIsModal(true);setId(id)}}/>
                        </td>
    </tr>
  ) 
}

export default CategoryRow