// import { CompanyType } from "./types/company";

import { useEffect, useState } from "react";
import { CompanyType } from "./types/company";
import { Accordion } from "./components/Accordion/Accordion";
import { getCompanies } from "./service/CompaniesService";
import SearchForm from "./components/SearchForm/SearchForm";

const App = () => {
  const [companies, setCompanies] = useState<CompanyType[] | undefined>();
  const [openCompany, setOpenCompany] = useState<number | undefined>();
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompanyType[] | undefined
  >(companies);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    getCompanies()
      .then((res: { companies: CompanyType[] }) => {
        setCompanies(res.companies);
        setFilteredCompanies(res.companies);
      })
      .finally(() => setLoader(false));
  }, []);

  const handleAccordion = (id: number) => {
    if (id == openCompany) {
      setOpenCompany(undefined);
      return;
    }
    setOpenCompany(id);
  };

  const onSearch = (searchText: string) => {
    if (searchText !== "") {
      const filteredCompanies = companies?.filter((company) =>
        company.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCompanies(filteredCompanies);
    } else {
      setFilteredCompanies(companies);
    }
  };

  return (
    <div style={{ minWidth: "500px" }}>
      <h1>Companies</h1>
      <SearchForm onSearch={onSearch} />
      {filteredCompanies && filteredCompanies.length ? (
        filteredCompanies.map((company: CompanyType) => (
          <Accordion
            key={company.id}
            id={company.id}
            title={company.name}
            handleAccordion={handleAccordion}
            isopen={company.id === openCompany}
          >
            <section className="accordion-content">
              <div className="column">
                <img src={company.images["64x64"]} alt={company.name} />
              </div>
              <div className="column">
                <span>Company: {company.name}</span>
                <span>Employees: {company.employees} </span>
                <span>Date: {company.date}</span>
              </div>
            </section>
          </Accordion>
        ))
      ) : (
        <p>{loader ? "Loading..." : "There is no company"}</p>
      )}
    </div>
  );
};

export default App;
