"use client";

import React from "react";
import { Button } from "../ui/button";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Row, RowData } from "@tanstack/react-table";
// import Image from "next/image";

const ExportAs = ({
  fileName,
  rows,
}: {
  fileName: string;
  rows: Row<RowData>[];
}) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: fileName, // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const exportExcel = () => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  return (
    <Button
      onClick={() => exportExcel()}
      className="flex gap-3 bg-light-600 px-6 font-[600] max-xs:px-3"
    >
      <span>Export csv</span>
      {/* <Image src="/images/icons/down.svg" width={15} height={7.5} alt="down" /> */}
    </Button>
  );
};

export default ExportAs;
