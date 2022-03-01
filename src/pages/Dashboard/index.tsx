
import {Header} from '../../components/Header';
import {api} from '../../services/api';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';

type stateInterface = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,  
}

type foodInterface = {
  name: string,
  description: string,
  price: string,
  available: boolean,
  image_url: string,
}


export function Dashboard() {
  
  const [state,setState] = useState<stateInterface[]>([]);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');

      setState({ foods: response.data });
    }

    loadFoods();
  }, []);

  async function handleAddFood(food:foodInterface) {
    const { foods } = state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food:foodInterface) {
    const { foods, editingFood } = state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

   async function handleDeleteFood(id:number) {
    const { foods } = state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setState({ foods: foodsFiltered });
  }

  function toggleModal(){
     const { modalOpen } = state;

    setState({ modalOpen: !modalOpen });
  
  }

  function toggleEditModal() {
    const { editModalOpen } = state;

    setState({ editModalOpen: !editModalOpen });
  }

  function handleEditFood(food:foodInterface){
    setState({ editingFood: food, editModalOpen: true });
  }

    const { modalOpen, editModalOpen, editingFood, foods } = state;

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
