import React, { useRef } from 'react';

const DatePicker = ({ date }) => {
  const dateObj = new Date(date);
  const defaultMonth = dateObj.getMonth() + 1;
  const defaultYear = dateObj.getFullYear();
  const formRef = useRef();

  return (
    <form ref={formRef} className="rankings__date_form" action="/" acceptCharset="UTF-8" method="get">
      <input name="utf8" type="hidden" value="✓" />
      <input type="hidden" id="match_date_day" name="match_date[day]" value="2" />
      <select id="match_date_month" defaultValue={defaultMonth} name="match_date[month]" onChange={() => formRef.current.submit()}>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select id="match_date_year" defaultValue={defaultYear} name="match_date[year]" onChange={() => formRef.current.submit()}>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select>
    </form>
  );
};

export default DatePicker;
