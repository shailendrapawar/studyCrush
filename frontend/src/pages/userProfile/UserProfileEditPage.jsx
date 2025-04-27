import { useSelector } from "react-redux"

const UserProfileEditPage = () => {

  const {authUser}=useSelector(s=>s.user);

  return (
    <div  className="h-screen bg-green-900" >

      <section>

      </section>

    </div>
  )
}
export default UserProfileEditPage