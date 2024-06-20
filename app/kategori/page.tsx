"use client";
import React, { Suspense } from 'react';
import Link from "next/link";
import Footer from '../footer';
import DashboardContent from './dasboardComponent';

export default function Page() {
  return (
    <main>
      <div className="flex justify-center mt-2">
        <h1 className="text-3xl font-bold">
          <Link className="btn btn-primary" href="/">
            WikiGapAnalysis
          </Link>
        </h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>

      <Footer />
    </main>
  );
}
