type PropsType = {
  count: number
  onClickGoBack: () => void
}

export const Success: React.FC<PropsType> = ({ count,onClickGoBack }) => {
  return (
    <div className="success-block">
      <img src="/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button onClick={onClickGoBack} className="send-invite-btn">Назад</button>
    </div>
  );
};