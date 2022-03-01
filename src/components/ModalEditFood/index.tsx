import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import Input from '../Input';

type ModalEditFoodProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: editingFoodInterface;
  handleUpdateFood: (data:editingFoodInterface) => void;
}
type editingFoodInterface ={
  name: string;
  description: string;
  price: string;
  available: boolean;
  image_url: string;
}

export function ModalEditFood(props:ModalEditFoodProps) {

   const formRef = createRef()
  

   async function handleSubmit(data:editingFoodInterface) {
    const { setIsOpen, handleUpdateFood } = props;

    handleUpdateFood(data);
    setIsOpen();
  };

    const { isOpen, setIsOpen, editingFood } = props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon={undefined} />

          <Input name="name" placeholder="Ex: Moda Italiana" icon={undefined} />
          <Input name="price" placeholder="Ex: 19.90" icon={undefined} />

          <Input name="description" placeholder="Descrição" icon={undefined} />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }

