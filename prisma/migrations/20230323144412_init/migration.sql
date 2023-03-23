BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Clients] (
    [Clientid] INT NOT NULL IDENTITY(1,1),
    [first_name] NVARCHAR(1000) NOT NULL,
    [last_name] NVARCHAR(1000) NOT NULL,
    [phone_number] NVARCHAR(1000) NOT NULL,
    [email_address] NVARCHAR(1000) NOT NULL,
    [birthday] DATETIME2 NOT NULL,
    [client_statusID] INT NOT NULL,
    CONSTRAINT [Clients_pkey] PRIMARY KEY CLUSTERED ([Clientid])
);

-- CreateTable
CREATE TABLE [dbo].[Client_status] (
    [client_statusID] INT NOT NULL,
    [client_status_description] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Client_status_pkey] PRIMARY KEY CLUSTERED ([client_statusID])
);

-- AddForeignKey
ALTER TABLE [dbo].[Clients] ADD CONSTRAINT [Clients_client_statusID_fkey] FOREIGN KEY ([client_statusID]) REFERENCES [dbo].[Client_status]([client_statusID]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
