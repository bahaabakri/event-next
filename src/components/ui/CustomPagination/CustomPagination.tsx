"use client"

import { Box, Pagination, PaginationProps } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

interface CustomPaginationProps extends PaginationProps {
  totalELements: number;
}

const CustomPagination: FC<CustomPaginationProps> = ({ totalELements, ...props }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const perPage = Number(searchParams.get("perPage")) || 10;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    params.set("perPage", perPage.toString()); // keep perPage consistent
    router.push(`?${params.toString()}`);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        page={currentPage}
        count={totalELements ? Math.ceil(totalELements / perPage) : 1}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        {...props}
      />
    </Box>
  );
};

export default CustomPagination;
