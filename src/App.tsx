import { useState, useEffect, ChangeEvent } from 'react';
import './index.scss';

import { Success } from './components/Success';
import { Users } from './components/Users';


function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((res) => setUsers(res.data))
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => setIsLoading(false))
  }, []);
  
  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const onClickInvite = (id: number) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  }
  const onClickGoBack = () => {
    setSuccess(false);
    setInvites([]);
  }

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} onClickGoBack={onClickGoBack} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
