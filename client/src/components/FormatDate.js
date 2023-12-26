const FormatDate = (dateString) => {
    // Функція FormatDate приймає рядок dateString, який містить дату.
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // options - це об'єкт, що містить налаштування для форматування дати.
    // В даному випадку, дата буде виглядати як "рік, повний місяць, день".
  
    // Використовуємо метод toLocaleDateString для форматування дати.
    return new Date(dateString).toLocaleDateString(undefined, options);
    // new Date(dateString) - створює об'єкт дати із переданого рядка.
    // toLocaleDateString - метод, який форматує дату відповідно до заданих параметрів options.
  };
  
  export default FormatDate;
  // Експортуємо функцію FormatDate для використання її в інших частинах програми.
  