'use client'

import React from "react";

export const showEmailList = ( data ) => {
    if (!data || data.length === 0) {
      return (
        <p className="text-center text-gray-500">
          No emails found... {data ? `(${data.length} emails loaded)` : '(No data)'}
        </p>
      );
    }

    return (
        <ul className="space-y-4 py-4">
            {data.map((email, index) => (
                <li key={email.uid || index} className="border rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500">
                    {new Date(email.date).toLocaleString()}
                </div>
                <div className="font-medium">
                    From: {email.from}
                </div>
                <div className="font-bold">
                    {email.subject}
                </div>
                <div className="mt-2 text-gray-700 whitespace-pre-wrap">
                    {typeof email.content === 'string'
                    ? email.content.slice(0, 200) + '...'
                    : 'Content not available'}
                </div>
                </li>
            ))}
        </ul>
    )
}
