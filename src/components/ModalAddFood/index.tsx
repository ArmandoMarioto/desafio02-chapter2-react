import {  createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import {Modal} from '../Modal';
import Input from '../Input';

type ModalAddFoodProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data:foodInterface) => void;
}
type foodInterface = {
  name: string,
  description: string,
  price: string,
  available: boolean,
  image_url: string,
}

export function ModalAddFood(props:ModalAddFoodProps){
  const formRef = createRef();

 async function handleSubmit (data:foodInterface){
    const { setIsOpen, handleAddFood } = props;

    handleAddFood(data);
    setIsOpen();
  };
    const { isOpen, setIsOpen } = props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon={undefined} />

          <Input name="name" placeholder="Ex: Moda Italiana" icon={undefined} />
          <Input name="price" placeholder="Ex: 19.90" icon={undefined} />

          <Input name="description" placeholder="Descrição" icon={undefined}/>
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }

export default ModalAddFood;
