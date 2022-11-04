FROM mcr.microsoft.com/dotnet/aspnet:2.1-focal AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:2.1-focal AS build
WORKDIR /src
COPY ["backend/backend-despesas-inteligente.csproj", "./"]
RUN dotnet restore "backend-despesas-inteligente.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "backend-despesas-inteligente.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backend-despesas-inteligente.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "backend-despesas-inteligente.dll"]

