import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const userPerPage = 10;
const UsersInfo = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const { data: users = [], refetch,isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/users/private');
            return res.data;
        }
    })
    if (isLoading) {
        return;
    }

    const totalUsers = users.length;
    const totalPages = Math.ceil(totalUsers / userPerPage);
    console.log(totalPages);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * userPerPage;
        const endIndex = startIndex + userPerPage;
        return users.slice(startIndex, endIndex);
    }, [users, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handleMakeAdmin = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make this user as a admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/api/v1/users/admin/${user._id}`)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire({
                                title: "Successfully Done!",
                                text: "",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div className='px-5 lg:px-0'>
            <Helmet title={`All Users | GS Classroom`} />
            <div className='max-w-3xl mx-auto mt-10'>
                <h2 className='capitalize text-2xl font-semibold'>total users: {paginatedData?.length} </h2>
            </div>

            <div className='max-w-5xl mx-auto mt-10'>
                <div className="overflow-x-auto">
                    {
                        users?.length > 0 ? (<table className="table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Make Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map((currentUser, index) =>
                                        <tr key={currentUser._id} className="hover">
                                            <th>{index + 1}</th>
                                            <td>
                                                <img className='w-10 h-10 rounded-md object-cover' src={currentUser?.photoURL} alt="" />
                                            </td>
                                            <td>{currentUser?.displayName}</td>
                                            <td>{currentUser?.email}</td>
                                            <td>{currentUser?.role}</td>
                                            <td>
                                                {
                                                    currentUser?.role === "admin" ? 'Already Added' : <button onClick={() => handleMakeAdmin(currentUser)}><img className='w-10 h-10 ml-3 object-cover' src="https://i.ibb.co/tHhLQdc/admin.png" alt="" /></button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>)
                            :
                            (<div className='flex items-center justify-center'><img src="https://i.ibb.co/CKTK7fD/loadData.png" alt="" /></div>)
                    }

                </div>
            </div>

            




            <div>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>







        </div>
    );
};

export default UsersInfo;