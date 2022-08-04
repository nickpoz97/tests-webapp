package org.univr.webapp.config.DbConfig;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    entityManagerFactoryRef = "dataEntityManagerFactory",
    transactionManagerRef = "dataTransactionManager",
    basePackages = {"org.univr.webapp.dataLayer.webappData", "org.univr.webapp.model.webappData"}
)
public class WebappDataConfig {
    @Bean(name= "dataDataSource")
    @Primary
    @ConfigurationProperties(prefix="spring.dsdata")
    public DataSource dataDatasource(){
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean(name = "dataEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean dataDbEntityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("dataDataSource") DataSource dataDataSource
    ){
        return builder
            .dataSource(dataDataSource)
            .packages("org.univr.webapp.dataLayer.webappData", "org.univr.webapp.model.webappData")
            .build();
    }

    @Bean(name= "dataTransactionManager")
    public PlatformTransactionManager dataDbTransactionManager(
            @Qualifier("dataEntityManagerFactory") EntityManagerFactory dataDbEntityManagerFactory
    ){
        return new JpaTransactionManager(dataDbEntityManagerFactory);
    }
}
