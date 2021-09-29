export interface UserSummaryInterface {
  metadata: [
    {
      records: number,
      totalPage: number,
      page: number
    }
  ],
  userSubmissions: [
    {
      _id: string,
      createdAt: string,
      updatedAt: string
    }
  ]
}

export interface UserSummaryDataInterface {
  id: string,
  submissionDate: string,
}