import { useForm } from 'react-hook-form';
import './ManageProducts.css';
import { useState } from 'react';

const ManageProducts = () => {
    const [containers, setContainers] = useState([{ id: 1 }]);

    const {
        register,
        handleSubmit, watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data);

    const addContainer = () => {
        const newId = containers.length > 0 ? Math.max(...containers.map(container => container.id)) + 1 : 1;
        setContainers([...containers, { id: newId }]);
    }

    const removeContainer = (id) => {
        setContainers(containers.filter(container => container.id !== id));
    }
    const formData = watch();
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-fit'>
            {containers.map(container => (
                <div key={container.id} className="border border-black w-fit h-fit p-10 mb-4">
                    <div className="flex justify-center align-middle items-center gap-10">
                        <input
                            {...register(`size${container.id}`, { required: true })}
                            className="border-[2px] border-primary"
                            type="text"
                        />
                        <input
                            {...register(`color${container.id}`, { required: true })}
                            className="border-[2px] border-primary"
                            type="color"
                            multiple
                        />
                        <input
                            {...register(`quantity${container.id}`, { required: true })}
                            className="border-[2px] border-primary"
                            type="text"
                        />

                        <button type="button" onClick={() => removeContainer(container.id)}>Remove</button>
                    </div>
                </div>

            ))}

            <button className='btn btn-rounded btn-neutral' onClick={addContainer}>Add Component</button>
<input type="submit" />
        </form>
    );
};

export default ManageProducts;