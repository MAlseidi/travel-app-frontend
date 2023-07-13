// @flow strict

import { Container, FormControl, InputAdornment, InputLabel, OutlinedInput, Pagination, PaginationItem, Tab, Tabs } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { TransportPageProps } from "../../../types/page-props";
import CarAdminCard from "../../admin-cards/car-admin-card";
import SectionTitle from "../../common/section-title";
import AdminAirportTransport from "./admin-airport-transport";
import AdminWithDriver from "./with-driver-admin";

function TransportDashboard({
  handleTabChange,
  currentTab,
  tabs,
  carsWithoutDriver,
  handleSearch,
  handlePageChange,
  metaData,
  carsWithDriver,
  airportTransport
}: TransportPageProps) {
  // console.log(airportTransport)

  return (
    <Container className='flex flex-col items-center'>
      <div className='lg:w-[60%] text-center py-3 px-6 regular-shadow rounded-lg'>
        <Tabs
          value={currentTab.value}
          onChange={handleTabChange}
          className='pages-tabs gap-5'
          TabIndicatorProps={{
            style: { display: "none" },
          }}>
          {
            tabs.map((tab, i) => (
              <Tab key={i} value={tab.value} className="" label={tab.title} />
            ))
          }
        </Tabs>
      </div>

      <div className='w-full' hidden={currentTab.value !== "all"} >
        <AdminAirportTransport airportTransport={airportTransport} />
      </div>

      <div className='w-full' hidden={currentTab.value !== "with_driver"} >
        <AdminWithDriver carsWithDriver={carsWithDriver} />
      </div>

      <div hidden={currentTab.value !== "without_driver"} className='my-4 w-full md:my-8'>
        <div className="flex items-center w-full justify-between">
          <SectionTitle title={currentTab.title} />
          <div className="">
            <FormControl size="small" className="shadow-sm" variant="outlined">
              <InputLabel>Search your  Need</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position="end">
                    <BiSearch className="text-[#EDA592]" />
                  </InputAdornment>
                }
                label="Search your Tours"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
        <>
          {
            carsWithoutDriver.length === 0 ?
              <div className="flex justify-center items-center my-5">
                <p className="text-3xl font-medium text-[#000000] py-5">
                  Cars data not found!
                </p>
              </div>

              :
              <div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {carsWithoutDriver?.map((car, i) => (
                  <CarAdminCard car={car} key={i} />
                ))}
              </div>
          }
          <div className='flex justify-center my-3 md:my-6'>
            {carsWithoutDriver.length > 0 && (
              <Pagination
                size='large'
                onChange={handlePageChange}
                count={metaData?.totalPages}
                shape='rounded'
                renderItem={(item) => (
                  <PaginationItem
                    sx={{ color: "#EDA592", bgcolor: "#ffffff" }}
                    className='pagination'
                    components={{
                      next: (props) => (
                        <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                          Next
                        </span>
                      ),
                      previous: (props) => (
                        <span className='border-0 p-0 bg-transparent text-[#EDA592]'>
                          Prev
                        </span>
                      ),
                    }}
                    {...item}
                  />
                )}
                variant='outlined'
              />
            )}
          </div>
        </>
      </div>
    </Container>
  );
};

export default TransportDashboard;