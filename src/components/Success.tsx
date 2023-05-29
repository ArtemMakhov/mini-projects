

type PropsType = {
  count: any
}

export const Success: React.FC<PropsType> = ({ count }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button className="send-invite-btn">Назад</button>
    </div>
  );
};