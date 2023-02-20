export interface CompanyType {
  id: number; // Unique identifier
  name: string; // Company name
  images: { [key: string]: string }; // Media images
  employees: number; // Employees count
  date: number; // Unix timestamp
}
